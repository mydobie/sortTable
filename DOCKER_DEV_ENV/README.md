# Developing inside a Docker Container

Instead of setting up Node and other dependencies on a machine, you can develop inside a Docker container. All that is needed on the development machine is [Docker](https://www.docker.com/products/docker-desktop) installed and running. Because the development files stay on the machine, you can continue to use your IDE of choice.

## Setting up the image and container (start here)

First ensure that is installed and Docker is running by running `docker image ls` in a terminal.

If you do not have an existing Docker container, run this command in a terminal at the root of this project:

```bash
bash ./DOCKER_DEV_ENV/docker create
```

The warning `WARNING: Image for service node_dev_env was built because it did not already exist. ...` is normal is to be expected.

This will create the Docker image and container for you to work in and will open a bash terminal inside the container.

When you are done type `exit` to get out of the container.

## Enter into an existing container

To re-enter an existing container, type the following in a terminal:

```bash
bash ./DOCKER_DEV_ENV/docker start
```

If you receive this error: `Error response from daemon: No such container: node_dev_env` Then set up the image and container using the directions in the section above.

## Stop a running container

When you exit out of a container it doesn't necessarily stop running which could consume resources on the host machine. To stop the container (but not delete), run this command:

```bash
bash ./DOCKER_DEV_ENV/docker stop
```

## Delete a container

If you wish to delete your container then run:

```bash
bash ./DOCKER_DEV_ENV/docker delete
```

## Delete an image

All containers are created from a Docker image. You can delete this base image (and any related containers) by running

```bash
bash ./DOCKER_DEV_ENV/docker destroy
```

## Auto Refresh

Unfortunately the browser will not automatically refresh when you make a change to a file. This means that you will need to hit the "refresh" button in your browser to see changes.

### Docker notes

The Docker scripts makes the following assumptions:

- You have shared your public key with GitHub
- Your private key is saved in ~/.ssh/id_rsa
- Your gitconfig files is saved in ~/.gitconfig

In the container, you are asked to enter your username and password when running git commands, your git is configured to work with https instead of ssh.

To change this:

- Open the .git config file for this project (.git/config)
- Change the `url` entry to something like this: `url = git@github.com:myorg/myrepo.git`

## Helpful Docker commands

- List all containers => `docker container ls -a`
- List all images => `docker image ls`
