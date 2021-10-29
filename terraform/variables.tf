variable "region" {
  default     = "eu-north-1"
  description = "AWS Region"
}

variable "cluster_name" {
  default = "keep-microservices"
}

variable "mongo_initdb_root_username" {
  description = "Mongodb root username"
  type        = string
}

variable "mongo_initdb_root_password" {
  description = "Mongodb root password"
  type        = string
}
