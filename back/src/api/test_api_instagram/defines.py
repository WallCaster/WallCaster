import requests
import json

def getCreds():

    creds = dict()

    creds['access_token'] = ''
    creds['client_id'] = '1433168140843709'
    creds['client_secret'] = '3adaa1565c11f23e46bbc3a3c328b21a'
    creds['graph_domain'] = 'https://graph.facebook.com/'
    creds['graph_version'] = 'v16.0'
    creds['endpoint_base'] = creds['graph_domain'] + creds['graph_version'] + '/'
    creds['debug'] = 'no'

    return creds

def makeApiCall(url, endPointParams, debug = 'no'):

    data = requests.get(url, endPointParams)
    response = dict()
    response['url'] = url
    response['endpoint_params'] = endPointParams
    response['endpoint_params_pretty'] = json.dumps(endPointParams, indent = 4)
    response['json_data'] = json.loads(data.content)
    response['json_data_pretty'] = json.dumps(response['json_data'], indent = 4)

    if (debug == 'yes'):
        displayApiCallData(response)

    return response

def displayApiCallData(response):

    print("\nURL: ")
    print(response["url"])
    print("\nEndpoint Params: ")
    print(response['endpoint_params_pretty'])
    print("\nResponse: ")
    print(response['json_data_pretty'])