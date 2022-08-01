import json
import pymysql
import credentials

endpoint = credentials.endpoint
username = credentials.username
password = credentials.password
database_name = credentials.database_name

connection = pymysql.connect(host=endpoint, user=username,
                             passwd=password, db=database_name)


def lambda_handler(event, context):
    customerId = event['queryStringParameters']['customerId']
    month = event['queryStringParameters']['month']

    cursor = connection.cursor()
    cursor.execute('SELECT accountId FROM customer WHERE customerId='+str(customerId)+';')
    accountId = cursor.fetchall()
    cursor.execute('SELECT SUM(amount) FROM Transactions WHERE accountId = '+str(accountId[0][0])+' AND MONTH(transactionDate) = '+str(month)+' AND YEAR(transactionDate) = 2022;')
    amount_sum = cursor.fetchall()
    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "http://www.task4website.com.s3-website-us-east-1.amazonaws.com",
        },
        "body": json.dumps({
            "customerId": customerId,
            "accountId": str(accountId[0][0]),
            "amount_sum": str(amount_sum[0][0])+" Rs",
        }),
    }
