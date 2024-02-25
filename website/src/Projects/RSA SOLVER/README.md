# RSA SOLVER

This website aims to solve RSA encryption problems.

## ALGORITHM

1. First we take 2 prime numbers, p and q, and calculate their product n = p * q.
2. Then we calculate the totient of n, which is (p-1) * (q-1).
3. We then take a number e, which is coprime to the totient of n.
4. We then calculate the modular multiplicative inverse of e and the totient of n, which is d. or e * d = 1 mod totient(n)
5. We then take the message, m, and encrypt it using the public key (e, n) to get the ciphertext, c. or c = m^e mod n
6. We then decrypt the ciphertext, c, using the private key (d, n) to get the message, m. or m = c^d mod n

## ALGORITHM

1. First we take 2 prime numbers, p and q, and calculate their product n = p * q.
2. Then we calculate the totient of n, which is (p-1) * (q-1).
3. We then take a number e, which is coprime to the totient of n.
4. We then calculate the modular multiplicative inverse of e and the totient of n, which is d. or e * d = 1 mod totient(n)
5. We then take the message, m, and encrypt it using the public key (e, n) to get the ciphertext, c. or c = m^e mod n
6. We then decrypt the ciphertext, c, using the private key (d, n) to get the message, m. or m = c^d mod n



## Features

- [x] RSA Encryption
- [x] RSA Decryption
- [x] RSA Key Generation

## Screenshots

- ### Key genration
![image](https://github.com/dhruvmillu/Front-End-Projects/assets/75222710/ec82809a-411d-49dd-9373-a880a8937382)


- ### Encryption
![image](https://github.com/dhruvmillu/Front-End-Projects/assets/75222710/4039b347-18f5-4153-824e-2bbe47371ad9)


- ### Decryption
![image](https://github.com/dhruvmillu/Front-End-Projects/assets/75222710/33fc25e9-b92b-48d0-9db6-26a65b45486e)

