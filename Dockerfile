FROM node:8.11.3

RUN apt-get update && \
  apt-get install -y curl && \
  apt-get install -y libaio-dev && \
  apt-get install -y unzip && \
  rm -rf /var/lib/apt/lists/*

#ADD ORACLE INSTANT CLIENT
RUN mkdir -p opt/oracle && \
  chmod -R 777 opt/oracle
COPY oracle/linux/ .

RUN unzip instantclient-basic-linux-x86-64-11.2.0.2.0.zip -d /opt/oracle \
  && unzip instantclient-sdk-linux-x86-64-11.2.0.2.0.zip -d /opt/oracle  \
  && mv /opt/oracle/instantclient_11_2 /opt/oracle/instantclient \
  && ln -s /opt/oracle/instantclient/libclntsh.so.11.1 /opt/oracle/instantclient/libclntsh.so \
  && ln -s /opt/oracle/instantclient/libocci.so.11.1 /opt/oracle/instantclient/libocci.so

ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"
ENV OCI_HOME="/opt/oracle/instantclient"
ENV OCI_LIB_DIR="/opt/oracle/instantclient"
ENV OCI_INCLUDE_DIR="/opt/oracle/instantclient/sdk/include"

RUN echo '/opt/oracle/instantclient/' | tee -a /etc/ld.so.conf.d/oracle_instant_client.conf && ldconfig

WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 4070
CMD ["npm", "start"]
