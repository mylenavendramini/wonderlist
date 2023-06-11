const url = 'http://localhost:3001';

const apiService = {};

apiService.getTravelCollections = async () => {
  const res = await fetch(`${url}/travelCollections`);
  const data = res.json()
  return data;
}

apiService.createTravelCollection = async (travelCollection, userId) => {
  const res = await fetch(`${url}/travelCollections`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ travelCollection, userId })
  });
  const data = res.json()
  return data;
}

apiService.deleteTravelCollection = async (id) => {
  try {
    const res = await fetch(`${url}/travelCollections/${id}`,
      {
        method: "DELETE",
      });
    const data = res.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
}

apiService.getCategories = async () => {
  const res = await fetch(`${url}/categories`);
  const data = res.json()
  return data;
}

apiService.createCategory = async (categoryObj, travelId) => {
  console.log(categoryObj, travelId)
  const res = await fetch(`${url}/categories`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ categoryObj, travelId })
  });
  const data = res.json()
  return data;
}

apiService.editCategory = async (id, place, address) => {
  const res = await fetch(`${url}/categories/${id}`,
    {
      method: "PUT",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ place, address })
    });
  const data = res.json();
  return data;
}

apiService.deleteCategory = async (id) => {
  try {
    const res = await fetch(`${url}/categories/${id}`,
      {
        method: "DELETE",
      });
    const data = res.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
}

apiService.getActivities = async () => {
  const res = await fetch(`${url}/activities`);
  const data = res.json()
  return data;
}

apiService.createActivity = async (activityObj, travelId) => {
  const res = await fetch(`${url}/activities`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ activityObj, travelId })
  });
  const data = res.json()
  return data;
}

apiService.deleteActivity = async (id) => {
  try {
    const res = await fetch(`${url}/activities/${id}`,
      {
        method: "DELETE",
      });
    const data = res.json();
    return data;
  }
  catch (error) {
    console.log(error)
  }
}

export default apiService;