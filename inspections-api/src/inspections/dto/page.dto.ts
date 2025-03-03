export class PageOptionsDTO {
  page?: number = 1;
  take?: number = 15;
  filter?: string;
  order?: string = 'desc';
  sort_by?: string = 'inspection_date';

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  buildPageOptionsDTO(options) {
    if (options.sort_by) {
      this.sort_by = options.sort_by;
    }

    if (options.order) {
      this.order = options.order;
    }

    if (options.page) {
      this.page = Number(options.page);
    }

    if (options.take) {
      this.take = Number(options.take);
    }

    if (options.filter) {
      this.filter = options.filter;
    }

    return this;
  }
}

interface PageMetaDTOParameters {
  pageOptionsDTO: PageOptionsDTO;
  itemCount: number;
}

export class PageMetaDTO {
  readonly page: number;
  readonly take: number;
  readonly filter: string;
  readonly order: string;
  readonly sort_by: string;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDTO, itemCount }: PageMetaDTOParameters) {
    this.page = pageOptionsDTO.page;
    this.take = pageOptionsDTO.take;
    this.filter = pageOptionsDTO.filter;
    this.order = pageOptionsDTO.order;
    this.sort_by = pageOptionsDTO.sort_by;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

export class PageDTO<T> {
  readonly data: T[];
  readonly meta: PageMetaDTO;
  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
