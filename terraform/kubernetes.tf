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

resource "kubernetes_secret" "docker-login" {
  metadata {
    name = "docker-cfg"
  }

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        "ghcr.io" = {
          auth = "${base64encode("${var.registry_username}:${var.registry_password}")}"
        }
      }
    })
  }

  type = "kubernetes.io/dockerconfigjson"
}

resource "kubernetes_deployment" "login-service" {
  metadata {
    name = "login"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app : "login"
      }
    }

    template {
      metadata {
        labels = {
          app = "login"
        }
      }

      spec {
        image_pull_secrets {
          name = "docker-cfg"
        }
        container {
          image             = "ghcr.io/eliasfrykholm/microservices-keep-clone/login-api:master"
          image_pull_policy = "Always"
          name              = "login"

          port {
            container_port = 8080
          }

          env {
            name  = "SPRING_DATA_MONGODB_URI"
            value = "mongodb://${var.mongo_initdb_root_username}:${var.mongo_initdb_root_password}@mongodb:27017"
          }

          env {
            name  = "LOGINSERVICE_APP_JWTSECRET"
            value = var.jwt_secret
          }

          env {
            name  = "LOGINSERVICE_APP_CORSORIGIN"
            value = "frontend:80"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "notes-service" {
  metadata {
    name = "note"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app : "note"
      }
    }

    template {
      metadata {
        labels = {
          app = "note"
        }
      }

      spec {
        image_pull_secrets {
          name = "docker-cfg"
        }
        container {
          image             = "ghcr.io/eliasfrykholm/microservices-keep-clone/notes-api:master"
          image_pull_policy = "Always"
          name              = "note"

          port {
            container_port = 12345
          }

          env {
            name  = "MONGO_URI"
            value = "mongodb://${var.mongo_initdb_root_username}:${var.mongo_initdb_root_password}@mongodb:27017"
          }

          env {
            name  = "LOGINSERVICE_APP_JWTSECRET"
            value = var.jwt_secret
          }

          env {
            name  = "CORS_ORIGIN"
            value = "frontend:80"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "frontend" {
  metadata {
    name = "frontend"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app : "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        image_pull_secrets {
          name = "docker-cfg"
        }
        container {
          image             = "ghcr.io/eliasfrykholm/microservices-keep-clone/frontend:master"
          image_pull_policy = "Always"
          name              = "frontend"

          port {
            container_port = 80
          }

          env {
            name  = "REACT_APP_LOGIN_API_URL"
            value = "http://localhost:80/login-api"
          }

          env {
            name  = "REACT_APP_NOTES_API_URL"
            value = "http://localhost:80/note-api"
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

resource "kubernetes_service" "login-service" {
  metadata {
    name = "login"
  }
  spec {
    selector = {
      app = "login"
    }
    port {
      port        = 8080
      target_port = 8080
    }
  }
}

resource "kubernetes_service" "note-service" {
  metadata {
    name = "note"
  }
  spec {
    selector = {
      app = "note"
    }
    port {
      port        = 12345
      target_port = 12345
    }
  }
}

resource "kubernetes_service" "frontend" {
  metadata {
    name = "frontend"
  }
  spec {
    selector = {
      app = "frontend"
    }
    port {
      port        = 80
      target_port = 80
    }
    type = "LoadBalancer"
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
