# DevOps

## Setup local machine, SSH

Check SSHD is installed:

```bash
$ ssh-keygen // generate shh key
$ ssh-keygen -t rsa // the same
```

ssh-keygen will create 2 files:
```bash
$ ~/.ssh/id_rsa // private key
$ ~/.ssh/id_rsa.pub // public key
```

If you make key with your own name f.e. id_rsa_digital_ocean, you should add this key manually.
```bash
$ ssh-add ~/.ssh/id_rsa_digital_ocean
```

Also, you should add your ssh key on digital ocean website.

How to Set Up SSH Keys on Ubuntu 18.04.
Public key goes into server "authorized_keys" file.
```bash
$ cat ~/.ssh/id_rsa.pub | ssh user_name@123.123.123.123 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys" // after than password is not needed
```

https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804

## Setup virtual machine

All this command on virtual machine:
```bash
$ sudo apt update
$ sudo apt upgrade

$ adduser user_name
$ id user_name // show user\'s info
$ usermod -aG sudo user_name // add to user needed (sudo) permissions
$ cd /home/user_name
$ mkdir .ssh
$ cd .shh
$ touch authorized_keys
```

After that copy id_rsa_digital_ocean.pub into authorized_keys in /home/user_name/.ssh/authorized_keys.
After that you should be able to shh user_name@123.123.123.123 without enter a password.

Disable root user:

```bash
$ sudo nano /etc/ssh/sshd_config // open sshd config
$ sudo systemctl reload sshd // 'apply' your changes
```

Find 'PermitRootLogin yes' and set 'PermitRootLogin no' to disable root user.
Also try to find and play with 'PasswordAuthentication no', probably if 'yes' you can login with login and password.

```bash
$ sudo chown -R user_name:user_name /home/user_name // to make user_name as owner of directory /home/user_name
$ ls -la // show all files and owners
```

If ssh-add does not work, try to use
```bash
$ eval `ssh-agent -s`
```
