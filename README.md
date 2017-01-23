# webrtc-nori-jen

## Creating a key/cerftificate pair

Command for generating key/cert pairs for HTTPS server:
openssl genrsa -out key.pem 2048 //  2048 bit long key
openssl req -new -key key.pem -out csr.pem // intermediate file  ( asks to enter company name..etc)
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem // generates cerftificate
rm csr.pem // rm intermediate file
