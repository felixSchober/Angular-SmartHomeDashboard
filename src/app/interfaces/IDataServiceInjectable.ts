import {TopicDataService} from '../services/topic-data.service';

export interface IDataServiceInjectable {
  setTopicDataService(dataService: TopicDataService): void;
}
