# this is a comment in our Dockerfile
# Every dockerfile starts with a FROM.  From
# Specifies what image you're building on top of.
# FROM should at least specify the OS, which images you use, you can check Dockerhub

#This is alpline linux with openjdk8 already installed
# our images are specified with imageName : tag so this is 'openjdk'-img name with a '8-jdk-alpine' - tag
FROM openjdk:8-jdk-alpine

#Our maven-plugin uses an argument for our Dockerfile, we specify that here:
ARG JAR_FILE

# Copy - important keyword.  Copies files from our machine into the image
# Here we're copying the Jar_file produced by maven into our docker image
# This adds an image layer on top of our base image, openjdk:8-jdk-alpine
COPY $JAR_FILE appcat.jar
# Now that we've run the COPY line, if we produced an image using this docker file,
# We'd hae alpine linux, jdk-8, and our cat service

#CMD lets us specify a command to be run when we start a container from this image
CMD ["java", "-jar", "appcat.jar"]

# Finally, we use EXPOSE to suggest a port to open on the machine running this container
# Since our Docker containers are like VMs and have their own OS, they have their OWN ports.
# If we want the 'outside-world' to be able to access our docker container, we need to expose its ports
EXPOSE 8081/tcp

# WE ALSO PUT A PLUG IN IN THE POM TO USE THIS DOCKER FILE