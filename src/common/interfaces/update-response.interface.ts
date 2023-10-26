import { ObjectLiteral } from 'typeorm';
import { IDeleteResponse } from './delete-response.interface';

export interface IUpdateResponse extends IDeleteResponse {
	generatedMaps?: ObjectLiteral[];
}
