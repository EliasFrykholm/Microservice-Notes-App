package utils

import "net/http"

type JwtHandlerInterface interface {
	ExtractTokenMetadata(r *http.Request) (*AccessDetails, error)
}
