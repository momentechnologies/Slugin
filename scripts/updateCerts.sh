#!/bin/bash

CA_DIR=data/https/ca
CERTS_DIR=data/https/certs

mkdir -p $CA_DIR
mkdir -p $CERTS_DIR

rm -f $CA_DIR/*
rm -f $CERTS_DIR/*

echo Generating CA key..
openssl genrsa -out $CA_DIR/ca.key 4096
echo Generating CA cert..
openssl req -x509 -new -nodes -key $CA_DIR/ca.key -sha256 -days 3650 -out $CA_DIR/cacert.pem \
  -subj "/C=NO/ST=Nordland/L=Myre/O=Slugin AS/OU=local/CN=slugin.io/emailAddress=local@slugin.io"
echo CA is complete.

DNS="DNS:api.local.slugin.io, DNS:app.local.slugin.io"


OPENSSL_CONFIG=$(mktemp)
    {
        echo '[dn]'
        echo 'CN=localhost'
        echo '[req]'
        echo 'distinguished_name = dn'
        echo '[EXT]'
	      echo "subjectAltName = $DNS"
        echo 'keyUsage=digitalSignature'
        echo 'extendedKeyUsage=serverAuth'
    } > "$OPENSSL_CONFIG"
    openssl req \
        -nodes \
        -newkey rsa:2048 \
        -subj '/CN=localhost' \
        -extensions EXT \
        -keyout $CERTS_DIR/slugin.key \
        -out $CERTS_DIR/slugin.csr \
        -config "$OPENSSL_CONFIG"

    EXTFILE=$(mktemp)
    echo "subjectAltName = $DNS" > "$EXTFILE"

    openssl x509 -req -in $CERTS_DIR/slugin.csr -CA $CA_DIR/cacert.pem -CAkey $CA_DIR/ca.key -CAcreateserial \
-out $CERTS_DIR/slugin.crt -days 3649 -sha256 -extfile "$EXTFILE"
    rm "$OPENSSL_CONFIG" "$EXTFILE"

echo "Copying $CA_DIR/cacert.pem to /usr/local/share/ca-certificates/slugin-dev"
sudo cp $CA_DIR/cacert.pem /usr/local/share/ca-certificates/slugin.crt
sudo update-ca-certificates --fresh