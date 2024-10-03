  interface RequestOptions {
    method: string;
    headers: {};
  };
// To do: single page options
export const getAllPages = async (token: string, allDraft: boolean) => {
    const requestOptions: RequestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
    const response = await fetch(
      'https://api.hubapi.com/cms/v3/pages/site-pages',
      requestOptions
    );
    const data = await response.json();
    const modifiedData = data.results.map((page: {
      archivedAt: string | undefined,
      state: string,
      publishImmediately: boolean
    }) => {
      const pageCopy = { ...page };
      delete pageCopy.archivedAt;
      if (allDraft) {
        pageCopy.state = 'DRAFT';
      }
      return pageCopy;
    });
    return modifiedData;
}
