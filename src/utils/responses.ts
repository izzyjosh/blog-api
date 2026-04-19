interface IMetadata {
  nextCursor?: string;
  totalCount?: number;
}

export interface ISuccess<TData> {
  status: "success";
  message?: string;
  data?: TData;
  metadata?: IMetadata;
}

export const successResponse = <TData>(
  data: ISuccess<TData>,
): ISuccess<TData> => {
  const response: ISuccess<TData> = {
    status: "success",
  };
  if (data.message) {
    response.message = data.message;
  }
  if (data.data) {
    response.data = data.data;
  }
  if (data.metadata) {
    response.metadata = data.metadata;
  }

  return response;
};
