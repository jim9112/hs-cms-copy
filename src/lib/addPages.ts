interface RequestOptions {
    method: string;
    headers: {};
    body: string;
    redirect: RequestRedirect | undefined;
  };

export const addPages = async (token: string, pages: [], sitePage: boolean) => {
  const pageType = sitePage ? 'site-pages' : 'landing-pages';
  const raw = JSON.stringify({
    inputs: pages,
  });
  const requestOptions: RequestOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: raw,
    redirect: "follow"
  };
  const response = await fetch(`https://api.hubapi.com/cms/v3/pages/${pageType}/batch/create`, requestOptions);
  const message = await response.text();
  return message;
};


