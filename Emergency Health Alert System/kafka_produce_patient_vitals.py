# importing required modules
import mysql.connector
import json
import time
from datetime import datetime
from kafka import KafkaProducer

# RDS configuration details
host = "upgraddetest.cyaielc9bmnf.us-east-1.rds.amazonaws.com"
user = "student"
pwd = "STUDENT123"
db =  "testdatabase"

# kafka environment details for message queueing and streaming 
bootstrap_servers = ["54.167.171.158:9092"]
kafka_topic = "patient-vital-info"

# create kafka producer object
kafka_producer = KafkaProducer(bootstrap_servers=bootstrap_servers, value_serializer=lambda x: json.dumps(x).encode('utf-8'))

wait = 1   # wait for 1 second to push patients vital info to kafka topic 

def get_db_con(host, user, pwd, db):
    conn =  mysql.connector.connect(
        host = host,
        user = user, 
        password = pwd,
        database = db
        ) 
    return conn

# function to fetch data from RDS
def fetch_data(tablename):
    query = "select * from " + tablename + " ;"
    dbcon = None
    cursor = None
    try:
        dbcon = get_db_con(host, user, pwd, db)
        cursor = dbcon.cursor()
        cursor.execute(query)
        result = cursor.fetchall() 
        return result 
    except Exception as e:
        return []
    finally:
        if cursor:
            cursor.close()
        if dbcon:
            dbcon.close()
        
# fetch data from RDS and push each row as message to kafka queue patient-vital-info       
if __name__ == '__main__':
    data = fetch_data("patients_vital_info")
    
    if len(data) == 0:
        message = {'customerId': None, 'heartBeat': None, 'bp': None, }
        print(message)
        kafka_producer.send(kafka_topic, message)
    else:
        for row in data:
            message = { 'customerId': row[0], 'heartBeat': row[1], 'bp': row[2]}
            print(message)
            kafka_producer.send(kafka_topic, message)
            time.sleep(wait)
