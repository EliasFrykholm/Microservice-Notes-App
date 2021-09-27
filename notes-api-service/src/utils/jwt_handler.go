package utils

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/spf13/viper"
)

type JwtHandler struct{}

func NewJwtHandler() *JwtHandler {
	return &JwtHandler{}
}

func (JwtHandler) ExtractToken(r *http.Request) string {
	bearToken := r.Header.Get("Authorization")
	strArr := strings.Split(bearToken, " ")
	if len(strArr) == 2 {
		return strArr[1]
	}
	return ""
}

func (h JwtHandler) VerifyToken(r *http.Request) (*jwt.Token, error) {
	tokenString := h.ExtractToken(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(viper.GetString("LOGINSERVICE_APP_JWTSECRET")), nil
	})
	if err != nil {
		return nil, err
	}
	return token, nil
}

func (h JwtHandler) TokenValid(r *http.Request) error {
	token, err := h.VerifyToken(r)
	if err != nil {
		return err
	}
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return err
	}
	return nil
}

func (h JwtHandler) ExtractTokenMetadata(r *http.Request) (*AccessDetails, error) {
	token, err := h.VerifyToken(r)
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		user, ok := claims["sub"].(string)
		if !ok {
			return nil, err
		}
		userId, ok := claims["jti"].(string)
		if !ok {
			return nil, err
		}
		return &AccessDetails{
			Username: user,
			UserId:   userId,
		}, nil
	}
	return nil, err
}
