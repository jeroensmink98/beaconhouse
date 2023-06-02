import { Body, Controller, Get, Post } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
    constructor(private dockerService: DockerService) { }

    @Get("containers/length")
    async getContainersLength(): Promise<number> {
        return await this.dockerService.getContainersLength();
    }

    @Get("containers")
    async getContainers(): Promise<any[]> {
        return await this.dockerService.getContainers();
    }

    @Get("containers/stop")
    async stopContainers(): Promise<void> {
        await this.dockerService.stopContainers();
    }

    @Post("containers/create")
    async createContainer(@Body() data: any): Promise<void> {
        await this.dockerService.createContainer(data.image, data.name, data.autoRemove, data.env);
    }

    @Post("containers/run")
    async runContainer(@Body() data: any): Promise<void> {
        await this.dockerService.runContainer(data.containerNameOrId);
    }

    @Get("images/length")
    async getImagesLength(): Promise<number> {
        return await this.dockerService.getImagesLength();
    }

    @Get("images")
    async getImages(): Promise<any[]> {
        return await this.dockerService.getImages();
    }
}

