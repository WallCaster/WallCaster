import configManager from '../config';
import { ApiName, Post } from '../post';
import { Api } from './api';

export class ApiInstagram extends Api {




    
    public fetchPosts(): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    protected getInterval(): number {
        throw new Error('Method not implemented.');
    }


}