# AMT-Kitchen

AMT-Kitchen is a Hotel management WebApp.

### Live link:

[https://amt-kitchen.vercel.app](https://amt-kitchen.vercel.app)

### GitHub Code link:

[https://github.com/AmtTawsik/AMT-Kitchen](https://github.com/AmtTawsik/AMT-Kitchen)

#### Answer the question no 1:

If we are using the 'hotfix' prefix, I will name the branch something like hotfix/issue-description.

1. I need to Create the hotfix branch:
   - I will Pull the latest changes.
   - I will create and switch to the hotfix branch.
  
2. Implement the hotfix
   - I will change the necessary code to fix the issue.
   - I will add a commit to my changed code.

3. I will Push the hotfix branch to the remote repository.
   
4. Then I will Create a Pull Request.

5. I will Add a relevant team members as reviewers for the PR.

6. Once the PR is approved and all checks pass, I will merge the PR into the main or production branch.

#### Answer the question no 2:

1. At first I will Define the dummyArr array.
2. I will Create a mapCategoriesToItems to link category IDs with menu items.
3. Then, I will Use useEffect to map the data on mount and render the categorized items.

##### Example:

```
import React, { useState, useEffect } from 'react';

const dummyArr = [
  {
    type: "Vegetarian",
    menuItems: [
      {id: 1, name: "Salad"},
      {id: 2, name: "Veg Burger"},
      {id: 3, name: "Pasta"}
    ],
    category: [{
      name: "Starters",
      menuItems: [1, 2]
    }]
  },
  {
    type: "Non-Vegetarian",
    menuItems: [
      {id: 4, name: "Chicken Wings"},
      {id: 5, name: "Beef Burger"},
      {id: 6, name: "Shrimp Pasta"}
    ],
    category: [{
      name: "Main Course",
      menuItems: [4, 5]
    }]
  }
];

function mapCategoriesToItems(menuCollections) {
  return menuCollections.map(collection => {
    const menuItemMap = {};
    collection.menuItems.forEach(item => {
      menuItemMap[item.id] = item;
    });

    return collection.category.map(cat => ({
      type: collection.type,
      category: cat.name,
      items: cat.menuItems.map(id => menuItemMap[id])
    }));
  }).flat();
}

const App = () => {
  const [categorizedItems, setCategorizedItems] = useState([]);

  useEffect(() => {
    const categorizedData = mapCategoriesToItems(dummyArr);
    setCategorizedItems(categorizedData);
  }, []);

  return (
    <div>
      {categorizedItems.map((cat, index) => (
        <div key={index}>
          <h2>{cat.type} - {cat.category}</h2>
          <ul>
            {cat.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default App;
```