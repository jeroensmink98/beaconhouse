import { Injectable } from '@nestjs/common';
import Docker = require('dockerode');

@Injectable()
export class DockerService {
    private _docker: Docker;

    constructor() {
        this._docker = new Docker();
    }

    /**
     * 
     * @returns the number of containers in the docker daemon
     */
    async getContainersLength(): Promise<number> {
        const containers = await this._docker.listContainers();
        return containers.length;
    }

    async getContainers(): Promise<Docker.ContainerInfo[]> {
        const containers = await this._docker.listContainers({ all: true });
        return containers;
    }

    async createContainer(image: string, name: string, autoRemove: boolean, env?: string): Promise<Docker.Container> {
        const container = await this._docker.createContainer({
            Image: image,
            name: name,
            Env: [env],
            HostConfig: {
                AutoRemove: autoRemove
            }
        });
        return container;
    }

    async runContainer(containerNameOrId: string): Promise<Docker.Container> {
        const container = this._docker.getContainer(containerNameOrId);
        return await container.start();
    }

    /**
     * 
     * @returns the number of images in the docker daemon
     */
    async getImagesLength(): Promise<number> {
        const images = await this._docker.listImages();
        return images.length;
    }


    /**
     * 
     * @returns the number of images in the docker daemon
     */
    async getImages(): Promise<Docker.ImageInfo[]> {
        const images = await this._docker.listImages();
        return images;
    }


    /**
     * Stops all containers in the docker daemon
     */
    async stopContainers(): Promise<void> {
        const containers = await this._docker.listContainers();
        containers.forEach(async (container) => {
            const containerInstance = this._docker.getContainer(container.Id);
            await containerInstance.stop();
        });
    }




}
