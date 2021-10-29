terraform {
  backend "s3" {
    bucket  = "keep-terraform-efrykhol"
    region  = "eu-north-1"
    key     = "global/s3/terraform.tfstate"
    encrypt = true
  }
  required_version = "> 0.14"
}

resource "aws_s3_bucket" "keep-terraform" {
  bucket = "keep-terraform-efrykhol"

  lifecycle {
    prevent_destroy = true
  }

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

data "aws_caller_identity" "current" {}

data "aws_eks_cluster" "cluster" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks.cluster_id
}

data "aws_availability_zones" "available" {

}

resource "aws_security_group" "worker_group_mgmt_one" {
  name_prefix = "worker_group_mgmt_one"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [
      "10.0.0.0/8"
    ]
  }
}

resource "aws_security_group" "all_worker_mgmt" {
  name_prefix = "all_worker_management"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"]
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.2.0"

  name                 = "test-vpc"
  cidr                 = "10.0.0.0/16"
  azs                  = data.aws_availability_zones.available.names
  private_subnets      = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets       = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = 1
  }
}

module "eks" {
  source                 = "terraform-aws-modules/eks/aws"
  version                = "17.22.0"
  cluster_name           = var.cluster_name
  cluster_version        = "1.20"
  subnets                = module.vpc.private_subnets
  cluster_create_timeout = "1h"
  vpc_id                 = module.vpc.vpc_id

  workers_group_defaults = {
    root_volume_type = "gp2"
  }

  worker_groups = [
    {
      name                          = "worker-group-1"
      instance_type                 = "t3.micro"
      additional_userdata           = "echo foo bar"
      asg_desired_capacity          = 2
      additional_security_group_ids = [aws_security_group.worker_group_mgmt_one.id]
    }
  ]

  worker_additional_security_group_ids = [aws_security_group.all_worker_mgmt.id]
}

resource "kubernetes_deployment" "mongodb" {
  metadata {
    name = "mongodb"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app : "mongodb"
      }
    }

    template {
      metadata {
        labels = {
          app = "mongodb"
        }
      }

      spec {
        container {
          image = "mongo:4.2.6-bionic"
          name  = "mongod"

          port {
            container_port = 27017
          }

          env {
            name  = "MONGO_INITDB_ROOT_PASSWORD"
            value = var.mongo_initdb_root_password
          }

          env {
            name  = "MONGO_INITDB_ROOT_USERNAME"
            value = var.mongo_initdb_root_username
          }

          volume_mount {
            name       = "mongodb-persistent-storage"
            mount_path = "/data/db"
          }
        }
        volume {
          name = "mongodb-persistent-storage"
          persistent_volume_claim {
            claim_name = "mongodb-pv-claim"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongodb" {
  metadata {
    name = "mongodb"
  }
  spec {
    selector = {
      app = "mongodb"
    }
    port {
      port        = 27017
      target_port = 27017
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mongodb-pv-claim" {
  metadata {
    name = "mongodb-pv-claim"
    labels = {
      app = "mongodb"
    }
  }
  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = "1Gi"
      }
    }
  }
}
