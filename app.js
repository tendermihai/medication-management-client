home();

let selectBtn = document.querySelector(".sort");

if (selectBtn) {
  selectBtn.addEventListener("change", async () => {
    let data = await getSortMedication(selectBtn.value);

    attachWidgets(data);
  });
}
