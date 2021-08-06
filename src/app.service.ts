import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  socialMedia = [
    {
      id: 1,
      src: 'instagram',
      title: 'instagram',
      link: 'https://instagram.com/',
      gitUser: 'fsjorgeluis',
    },
    {
      id: 2,
      src: 'twitter',
      title: 'twitter',
      link: 'https://twitter.com/',
      gitUser: 'fsjorgeluis',
    },
    {
      id: 3,
      src: 'linkedin',
      title: 'linkedin',
      link: 'https://linkedin.com/',
      gitUser: 'josarit',
    },
  ];

  work = [
    {
      id: 1,
      src: 'url imágen',
      title: 'password-generator',
      link: 'https://linktorepo',
      gitUser: 'fsjorgeluis',
    },
    {
      id: 2,
      src: 'url imágen',
      title: 'codeshop',
      link: 'https://linktorepo',
      gitUser: 'fsjorgeluis',
    },
  ];

  aptitude = [
    {
      id: 1,
      src: 'icon font', //icon font
      title: 'Creatividad',
      stars: 5,
      gitUser: 'fsjorgeluis',
    },
    {
      id: 2,
      src: 'icon font', //icon font
      title: 'Proatividad',
      stars: 5,
      gitUser: 'josarit',
    },
  ];

  tech = [
    {
      id: 1,
      src: 'url imagen', //img url
      title: 'NodeJs',
      stars: 3,
      gitUser: 'fsjorgeluis',
    },
    {
      id: 2,
      src: 'url imagen', //img url
      title: 'ReactJs',
      stars: 5,
      gitUser: 'fsjorgeluis',
    },
    {
      id: 3,
      src: 'url imagen', //img url
      title: 'MongoDB',
      stars: 2,
      gitUser: 'josarit',
    },
  ];

  profile = [
    {
      id: 1,
      photo: 'url de la foto',
      avatar: 'url del avatar',
      fullName: 'Jorge Fernandez',
      gitUser: 'fsjorgeluis',
      greet: 'hola',
      bio: 'mi bio info',
      cv: 'url del cv',
      // tech: this.tech.filter((item) => item.gitUser === 'fsjorgeluis'),
      // tech: this.tech.find((item) => item.gitUser === 'fsjorgeluis')
    },
    {
      id: 2,
      photo: 'url de la foto',
      avatar: 'url del avatar',
      fullName: 'Jorge Fernandez',
      gitUser: 'josarit',
      greet: 'hola',
      bio: 'mi bio info',
      cv: 'url del cv',
    },
  ];

  portfolio = [
    {
      id: 1,
      profile: this.profile.filter((item) => item.gitUser === 'fsjorgeluis'),
      socialMedia: this.socialMedia.filter(
        (item) => item.gitUser === 'fsjorgeluis',
      ),
      aptitudes: this.aptitude.filter((item) => item.gitUser === 'fsjorgeluis'),
      techs: this.tech.filter((item) => item.gitUser === 'fsjorgeluis'),
      works: this.work.filter((item) => item.gitUser === 'fsjorgeluis'),
    },
    {
      id: 2,
      profile: this.profile.filter((item) => item.gitUser === 'josarit'),
      socialMedia: this.socialMedia.filter(
        (item) => item.gitUser === 'josarit',
      ),
      aptitudes: this.aptitude.filter((item) => item.gitUser === 'josarit'),
      techs: this.tech.filter((item) => item.gitUser === 'josarit'),
      works: this.work.filter((item) => item.gitUser === 'josarit'),
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getPortfolio(gitUser: string): any {
    return this.portfolio.find((item) => item.profile[0].gitUser === gitUser);
  }

  getProfile(): any {
    return this.profile;
  }

  getSocialMedia(): any {
    return this.socialMedia;
  }

  getWork(): any {
    return this.work;
  }

  getAptitude(): any {
    return this.aptitude;
  }
  getTech(): any {
    return this.tech;
  }
}
