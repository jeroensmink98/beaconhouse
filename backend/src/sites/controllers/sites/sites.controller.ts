import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSiteDto } from 'src/sites/dto/sites.dtos';
import { SitesService } from 'src/sites/services/sites/sites.service';

@Controller('sites')
export class SitesController {
    constructor(private readonly sitesService: SitesService) { }


    @Get()
    async getSites() {
        return await this.sitesService.getAllSites();
    }

    @Get('id/:id')
    async findSiteById(@Param('id', ParseIntPipe) id: number) {
        return await this.sitesService.findSiteById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async createSite(@Body() createSiteDto: CreateSiteDto) {
        return await this.sitesService.createSite(createSiteDto);
    }

}
