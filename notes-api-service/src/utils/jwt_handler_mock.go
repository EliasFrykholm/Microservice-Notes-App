package utils

import "net/http"

type JwtHandlerMock struct{}

func (JwtHandlerMock) ExtractTokenMetadata(r *http.Request) (*AccessDetails, error) {
	return &AccessDetails{
		Username: "test",
		UserId:   "test",
	}, nil
}
