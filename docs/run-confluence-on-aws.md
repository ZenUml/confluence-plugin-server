

# EC2

## Does any Confluence Docker Image still support builtin h2 DB for demo and testing?

## Any AWS built-in EC2 templates has builtin docker?


## Install Docker

1. Launch an instance with the Amazon Linux 2 AMI.
1. Connect to the instance with `ssh -i "non-prod-key-pair.pem" ec2-user@ec2-34-222-203-230.us-west-2.compute.amazonaws.com`
1. Update the installed packages `sudo yum update -y`
1. Install docker `sudo amazon-linux-extras install docker`
1. `sudo service docker start`
1. `sudo usermod -a -G docker ec2-user`
1. Log out and log back in. `logout`
1. Verify with `docker info`

> If you see "Got permission denied", reboot your instance with `sudo reboot` or repeat `sudo service docker start` and
`sudo usermod -a -G docker ec2-user`.

## Run docker
```
docker run -v /home/ec2-user/conf710:/var/atlassian/application-data/confluence --name="confluence" -d -p 8090:8090 -p 8091:8091 atlassian/confluence-server:7.1.0
```

# Not successful yet
