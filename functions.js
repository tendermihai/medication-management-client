async function home() {
  let container = document.querySelector(".container");
  container.innerHTML = `
  
    
  
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

  container.addEventListener("click", (e) => {
    let obj = e.target;

    if (obj.classList.contains("editBtn")) {
      let parent =
        obj.parentNode.previousElementSibling.querySelector(
          ".product-id"
        ).textContent;
      console.log(parent);

      updateMedicationPage(parent);
    }
    let selectBtn = document.querySelector(".sort");
    if (selectBtn) {
      selectBtn.addEventListener("change", async () => {
        console.log(selectBtn.value);

        let data = await getSortedBy(selectBtn.value);

        attachWidgets(data);
      });
    }
  });

  let containerNew = document.querySelector(".container");

  if (containerNew) {
    containerNew.addEventListener("click", async (e) => {
      let obj = e.target;

      if (obj.classList.contains("deleteBtn")) {
        let card = obj.closest(".widget-card");
        let id =
          obj.parentNode.previousElementSibling.querySelector(
            ".product-id"
          ).textContent;
        console.log(id);
        await delMedication(id);
        card.remove();
      }
    });
  }
}

function createWidget(product) {
  let section = document.createElement("section");
  section.classList.add("widget-card");
  section.dataset.id = product.id;
  section.innerHTML = `
  
  <div class="col-md-4">
  <div class="widget lazur-bg p-xl">
      <h2>${product.company}</h2>
      <ul class="list-unstyled m-t-md">
          <li>
              <span class="fa fa-envelope m-r-xs"></span>
              <label>ID:</label>
              <span class="product-id">${product.id}<span>
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
      <div class="btns">
      <button class="editBtn">Edit</button>
      <button class="deleteBtn">Delete</button>
      </div>
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
        
        <hr>
        <div class="row">
            <!-- left column -->


            <!-- edit form column -->
            <div class="col-md-9 personal-info">

                

                <form class="form-horizontal" role="form">
                   
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Company:</label>
                        <div class="col-lg-8">
                            <input class="form-control company" type="text" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Brand name:</label>
                        <div class="col-lg-8">
                            <input class="form-control brand_name" type="text" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Generic name:</label>
                        <div class="col-lg-8">
                            <input class="form-control generic_name" type="text" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Diagnosis code:</label>
                        <div class="col-lg-8">
                            <input class="form-control diagnosis_code" type="text" value="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">NHS number:</label>
                        <div class="col-lg-8">
                            <input class="form-control nhs_number" type="text" value="">
                        </div>

                    </div>

                </form>
            </div>
        </div>

        <button type="submit" class="submitBtn">Submit</button>
        <button class="cancel">Cancel</button>
    </div>
  `;

  let cancelBtn = document.querySelector(".cancel");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      console.log("test");
      home();
    });
  }

  let submitBtn = document.querySelector(".submitBtn");

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const company = document.querySelector(".company").value;
      const brand_name = document.querySelector(".brand_name").value;
      const generic_name = document.querySelector(".generic_name").value;
      const diagnosis_code = document.querySelector(".diagnosis_code").value;
      const nhs_number = document.querySelector(".nhs_number").value;
      addMedication({
        company,
        brand_name,
        generic_name,
        diagnosis_code,
        nhs_number,
      }).value;

      home();
    });
  }
}

async function updateMedicationPage(id) {
  let container = document.querySelector(".container");
  console.log("id:", id);
  let medication = await getMedById(id);
  console.log(medication);

  container.innerHTML = "";
  container.innerHTML = `
  <div class="container-new update-container bootstrap snippets bootdey">
        
        <hr>
        <div class="row">
            <!-- left column -->


            <!-- edit form column -->
            <div class="col-md-9 personal-info">



                <form class="form-horizontal" role="form">

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Company:</label>
                        <div class="col-lg-8">
                            <input class="form-control company" type="text" value="${medication.company}" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Brand Name:</label>
                        <div class="col-lg-8">
                            <input class="form-control brand_name" type="text" value="${medication.brand_name}" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Generic Name:</label>
                        <div class="col-lg-8">
                            <input class="form-control generic_name" type="text" value="${medication.generic_name}" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Diagnosis Code:</label>
                        <div class="col-lg-8">
                            <input class="form-control diagnosis_code" type="text" value="${medication.diagnosis_code}" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">NHS Number:</label>
                        <div class="col-lg-8">
                            <input class="form-control nhs_number" type="text" value="${medication.nhs_number}" placeholder="">
                        </div>

                    </div>
                </form>
            </div>
        </div>

        <button class="editMed">Update</button>
        <button class="cancelEdit">Cancel</button>
    </div>
    
    `;

  let cancelEdit = document.querySelector(".cancelEdit");

  cancelEdit.addEventListener("click", () => {
    home();
  });

  let editBtn = document.querySelector(".editMed");

  editBtn.addEventListener("click", async (e) => {
    console.log(medication);

    let company = document.querySelector(".company").value;
    let brand_name = document.querySelector(".brand_name").value;
    let generic_name = document.querySelector(".generic_name").value;
    let diagnosis_code = document.querySelector(".diagnosis_code").value;
    let nhs_number = document.querySelector(".nhs_number").value;
    await updateMedication({
      id,
      company,
      brand_name,
      generic_name,
      diagnosis_code,
      nhs_number,
    });

    home();
  });
}

async function findMed(id) {
  let data = await getMedication();
  let foundMed;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      foundMed = data[i];
      console.log(foundMed);
    }
  }

  return foundMed;
}
