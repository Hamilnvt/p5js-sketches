// Title: "filter"
// Created: ven 27 set 2024, 18:49:22, CEST

function setup()
{
  var items = ["1", "2", "3", "4", "5"]
  var filters = [true, false, true, true, true]

  print("Items:", items)
  print("Filters:", filters)

  const allFilters = () => {
    for (let i = 0; i < filters.length; i++) {
      if (!filters[i]) return false;
    }
    return true;
  }

  const filterItems = () => allFilters() ? items : items.filter((item, index) => filters[index])
  var filtered_items = filterItems()
  print("Filtered items:", filtered_items)

  print("All filters?", allFilters() ? "Yes" : "No")

}

