import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { recommend, type Conditions } from '@bitebrain/core';

export const recommendHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Parse conditions from request body or query parameters
    const conditions: Conditions = event.body 
      ? JSON.parse(event.body)
      : {
          season: (event.queryStringParameters?.season as any) || 'spring',
          wind: (event.queryStringParameters?.wind as any) || 'light',
          temp: event.queryStringParameters?.temp 
            ? parseInt(event.queryStringParameters.temp) 
            : 65,
          clarity: (event.queryStringParameters?.clarity as any) || 'clear'
        };

    const recommendations = recommend(conditions);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        data: recommendations,
        conditions
      })
    };
  } catch (error) {
    console.error('Error in recommendHandler:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

// Health check handler
export const healthHandler = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      success: true,
      message: 'BiteBrain API is healthy',
      timestamp: new Date().toISOString()
    })
  };
};
