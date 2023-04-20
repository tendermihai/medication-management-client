async function home() {
  let data = await getMedication();
  console.log(data);
  attachWidgets(data);
}

function createWidget(product) {
  let section = document.createElement("section");
  section.classList.add("widget-card");

  section.innerHTML = `
  
  <div class="col-md-4">
  <div class="widget lazur-bg p-xl">
      <h2>${product.company}</h2>
      <ul class="list-unstyled m-t-md">
          <li>
              <span class="fa fa-envelope m-r-xs"></span>
              <label>ID:</label>
              ${product.id}
          </li>
          <li>
              <span class="fa fa-home m-r-xs"></span>
              <label>Company:</label>
              ${product.company}
          </li>
          <li>
              <span class="fa fa-phone m-r-xs"></span>
              <label>Brand name:</label>
              ${product.brand_name}
          </li>
          <li>
              <span class="fa fa-phone m-r-xs"></span>
              <label>Generic name:</label>
              ${product.generic_name}
          </li>
          <li>
              <span class="fa fa-phone m-r-xs"></span>
              <label>Diagnosis code:</label>
              ${product.diagnosis_code}
          </li>
          <li>
              <span class="fa fa-phone m-r-xs"></span>
              <label>NHS Number:</label>
              ${product.nhs_number}
          </li>
      </ul>
  </div>
</div>
  `;

  return section;
}

function attachWidgets(products) {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  products.forEach((product) => {
    container.appendChild(createWidget(product));
  });
}
