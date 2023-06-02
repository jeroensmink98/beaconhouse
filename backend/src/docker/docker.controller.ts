import { Controller, Get } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
    constructor(private dockerService: DockerService){}

    @Get("containers/length")
    async getContainersLength(): Promise<number> {
        return await this.dockerService.getContainersLength();
    }

    @Get("images/length")
    async getImagesLength(): Promise<number> {
        return await this.dockerService.getImagesLength();
    }
}
