async function home() {
  let container = document.querySelector(".container");
  container.innerHTML = `
  
    <h1>Medication Management</h1>
  
    <button class="addBtn">Add a new Medication</button>
  
    <select name="sort" class="sort">
        <option value="">--Sort By--</option>
        <option value="company">Sort by company</option>
        <option value="brand_name">Sort by Brand</option>
        <option value="generic">Sort by Generic</option>
    </select>
  
    <div class="container-cards">
    
    
    </div>
    
    `;

  let data = await getMedication();
  console.log(data);
  attachWidgets(data);

  let addBtn = document.querySelector(".addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addMedicationPage();
    });
  }

  let selectBtn = document.querySelector(".sort");

  if (selectBtn !== null) {
    selectBtn.addEventListener("change", async () => {
      let data = await getSortMedication(selectBtn.value);

      attachWidgets(data);
    });
  }
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
  let container = document.querySelector(".container-cards");
  container.innerHTML = "";
  products.forEach((product) => {
    container.appendChild(createWidget(product));
  });
}

function addMedicationPage() {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  container.innerHTML = `
      <div class="container-new bootstrap snippets bootdey">
            <h1 class="text-primary">Medication Management</h1>
            <hr>
            <div class="row">
                <!-- left column -->

                <!-- edit form column -->
                <div class="col-md-9 personal-info">

                    <h3>Add a new Medication</h3>

                    <form class="form-horizontal" role="form">
                        <!-- <div class="form-group">
                            <label class="col-lg-3 control-label">ID:</label>
                            <div class="col-lg-8">
                                <input class="form-control id" type="text" value="" placeholder="Please enter the car ID">
                            </div>
                        </div> -->
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Company:</label>
                            <div class="col-lg-8">
                                <input class="form-control firstName" type="text" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Brand name:</label>
                            <div class="col-lg-8">
                                <input class="form-control lastName" type="text" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Generic name:</label>
                            <div class="col-lg-8">
                                <input class="form-control role" type="text" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Diagnosis code:</label>
                            <div class="col-lg-8">
                                <input class="form-control gender" type="text" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">NHS number:</label>
                            <div class="col-lg-8">
                                <input class="form-control email" type="text" value="">
                            </div>

                        </div>

                    </form>
                </div>
            </div>

            <button type="submit" class="submitBtn">Submit</button>
            <button class="cancel">Cancel</button>
        </div>
      `;
}
