import { Injectable } from '@nestjs/common';
import {Docker} from 'dockerode';

@Injectable()
export class DockerService {

    private docker: Docker;
    
    async getContainersLength(): Promise<number> {
        const containers = await this.docker.listContainers();
        return containers.length;
    }



    async getImagesLength(): Promise<number> {
        const images = await Docker.listImages();
        return images.length;
    }


}
