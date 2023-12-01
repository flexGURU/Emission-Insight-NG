import { Injectable } from '@angular/core';
import { API, GraphQLResult } from '@aws-amplify/api';
import config from './api/src/aws-exports';
import { getSensorData } from './api/src/graphql/queries';
import { GetSensorDataQuery } from './api/src/API';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor() {
    API.configure(config);
  }

  async list(): Promise<GetSensorDataQuery> {
    try {
      const response: GraphQLResult<GetSensorDataQuery> = (await API.graphql({
        query: getSensorData,
        variables: {
          // <your variables, optional>
        }
      })) as GraphQLResult<GetSensorDataQuery>;
  
      console.log('Response from API: ', response);
  
      if (response.data) {
        return response.data;
      } else {
        console.error('No data in the response.');
        return {}; // Return an empty object or handle the error as needed
      }
    } catch (error) {
      console.error('Error in list:', error);
      throw error; // Rethrow the error for the component to handle
    }
  }
}