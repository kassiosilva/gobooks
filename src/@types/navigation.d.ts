import { BookDetailsProps } from '@screens/BookDetails';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      bookDetails: BookDetailsProps;
    }
  }
}
