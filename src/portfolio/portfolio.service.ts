import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import {
  Aptitude,
  AptitudeDocument,
} from 'src/aptitude/schema/aptitude.schema';
import { Network, NetworkDocument } from 'src/network/schema/network.schema';
import { Profile, ProfileDocument } from 'src/profile/schema/profile.schema';
import { Tech, TechDocument } from 'src/tech/schema/tech.schema';
import { Work, WorkDocument } from 'src/work/schema/work.schema';
import { CreatePortfolioDTO } from './dtos';
import { Portfolio, PortfolioDocument } from './schema/portfolio.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private portfolioModel: PaginateModel<PortfolioDocument>,
    @InjectModel(Profile.name)
    private profileModel: PaginateModel<ProfileDocument>,
    @InjectModel(Network.name)
    private socialMediaModel: PaginateModel<NetworkDocument>,
    @InjectModel(Work.name)
    private workModel: PaginateModel<WorkDocument>,
    @InjectModel(Aptitude.name)
    private aptitudeModel: PaginateModel<AptitudeDocument>,
    @InjectModel(Tech.name)
    private techModel: PaginateModel<TechDocument>,
  ) {}

  async create(gitUser: string): Promise<any> {
    const profile = await this.profileModel.findOne({ gitUser });
    const network = await this.socialMediaModel.find({ gitUser: profile._id });
    const work = await this.workModel.find({ gitUser: profile._id });
    const aptitude = await this.aptitudeModel.find({ gitUser: profile._id });
    const tech = await this.techModel.find({ gitUser: profile._id });

    const portfolio = new this.portfolioModel({
      profile: profile,
      socialMedia: network,
      works: work,
      aptitudes: aptitude,
      techs: tech,
    });
    await portfolio.save();
    return portfolio;
    // const newTech = new this.techModel(jobsDone);
    //   await newTech.save();

    return { profile, network, work, aptitude, tech };
  }
}
