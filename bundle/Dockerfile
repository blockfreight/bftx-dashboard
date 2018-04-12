FROM  ubuntu:16.04

#  Package Dockerfile is a package that defines the Blockfreight, Inc. - OFBiz (ERP) Docker Image
#  and provides some useful functions to work with the BF_TX token ecosystem.
MAINTAINER Julian Smith <julian.smith@blockfreight.com>

# Enable Doccker Ports - Primary ['1'] Secondary ['2'] Tertiary ['3']
# 80:http(1) 443:https(1) 5432:PostgreSQL(1) 8080:http(2) 8081:http(3) 8443:https(2)
EXPOSE 80 443 5432 8080 8081 8443

RUN echo "debconf shared/accepted-oracle-license-v1-1 select true" | debconf-set-selections
RUN echo "debconf shared/accepted-oracle-license-v1-1 seen true" | debconf-set-selections
RUN export DEBIAN_FRONTEND=noninteractive

RUN apt update -y
RUN apt upgrade -y

# Update package manager and update default applications.
RUN apt install -y software-properties-common wget unzip net-tools
RUN add-apt-repository -y ppa:webupd8team/java
RUN apt update -y
RUN apt install -y oracle-java8-installer

RUN echo "export JAVA_HOME=/usr/lib/jvm/java-8-oracle" >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"

# Install pre-requisites applications to support OFBiz in production.

# Install PostgreSQL - core database server
# RUN apt­get install postgresql-9.6
# PostgreSQL - client libraries and client binaries
# RUN apt­get install postgresql-client-9.6
# PostgreSQL - additional supplied modules
# RUN apt­get install postgresql-contrib-9.6
# PostgreSQL - libraries and headers for C language frontend development
# RUN apt­get install libpq-dev
# PostgreSQL - libraries and headers for C language backend development
# RUN apt­get install postgresql-server-dev-9.6
# PostgreSQL - pgAdmin III graphical administration utility
# RUN apt­get install pgadmin3
# Install PostgreSQL - PostgreSQL ­Java Library
# RUN apt­get install libpostgresql­java

# Setup PostgreSQL
#RUN -i -u postgres
#RUN psql

#RUN CREATE USER root WITH PASSWORD 'root';
#RUN CREATE DATABASE "test";
#RUN GRANT ALL ON DATABASE "test" TO root;
#RUN \q
#RUN $ exit

# Notes: postgresql libpq5 postgresql-9.5 postgresql-client-9.5 postgresql-client-common postgresql-contrib

# Install NGinx
#RUN apt­get install nginx­full

# Install the reference implementation of OFBiz
RUN	wget http://mirror.dsrg.utoronto.ca/apache/ofbiz/apache-ofbiz-16.11.04.zip
RUN	unzip apache-ofbiz-16.11.04.zip

# Install the reference implementation of OFBiz
WORKDIR apache-ofbiz-16.11.04
RUN ./gradlew cleanAll loadDefault
CMD ./gradlew ofbiz
