const hasFilter = (query) => {
  if (Object.keys(query).length === 0) return false;
  else if (Object.keys(query).length === 1 && query.hasOwnProperty("order"))
    return false;
  else return true;
};
const filter = (req, obj) => {
  const search = req.query.search || false;
  const order = req.query.order || false;
  const createdBefore = req.query.createdbefore || false;
  const createdAfter = req.query.createdafter || false;
  const minPrice = parseInt(req.query.minprice) || false;
  const maxPrice = parseInt(req.query.maxprice) || false;
  const category = req.query.category || false;
  const price = parseInt(req.query.price) || false;

  let filter = obj;
  const query = req.query;

  if (hasFilter(query)) {
    if (search) {
      filter = obj.filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }
    if (category) {
      filter = obj.filter(
        (item) =>
          item.category.toLocaleLowerCase() === category.toLocaleLowerCase()
      );
    }
    if (price) {
      filter = obj.filter((item) => item.price === price);
    }
    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        filter = obj.filter(
          (item) => item.price >= minPrice && item.price <= maxPrice
        );
      } else if (minPrice) {
        filter = obj.filter((item) => item.price >= minPrice);
      } else {
        filter = obj.filter((item) => item.price <= maxPrice);
      }
    }

    if (createdAfter || createdBefore) {
      const after = new Date(createdAfter);
      const before = new Date(createdBefore);
      if (createdAfter && createdBefore) {
        filter = obj.filter(
          (item) => item.createAt >= after && item.createAt <= before
        );
      } else if (createdAfter) {
        filter = obj.filter((item) => item.createAt >= after);
      } else {
        filter = obj.filter((item) => item.createAt <= before);
      }
    }
  }

  if (order) {
    switch (order) {
      case "az":
        filter.sort((a, b) => a.name - b.name);
        break;
      case "za":
        filter.sort((a, b) => b.name - a.name);
        break;
      case "recentcreation":
        filter.sort((a, b) => b.createAt - a.createAt);
        break;
      case "firstcreate":
        filter.sort((a, b) => a.createAt - b.createAt);
        break;
      case "recentupdate":
        filter.sort((a, b) => b.updatedAt - a.updatedAt);
        break;
      case "firstupdate":
        filter.sort((a, b) => a.updatedAt - b.updatedAt);
        break;
      case "maxprice":
        filter.sort((a, b) => b.price - a.price);
        break;
      case "minprice":
        filter.sort((a, b) => a.price - b.price);
        break;
      default:
        filter.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }
  return filter;
};
module.exports = filter;
