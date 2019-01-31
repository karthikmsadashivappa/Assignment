(function() {
  var board = document.getElementById("board");
  var columns = board.querySelectorAll("section.column");
  var cards = board.querySelectorAll(".card");
  var draggingCard;
  var changingColumn = false;
  var currentDropzone;

  columns.forEach(function(column) {
    column.addEventListener("dragover", function(e) {
      e.preventDefault();
      e.stopPropagation();
      changingColumn = !e.currentTarget.contains(draggingCard);
      var currentColumn = e.currentTarget;
      var target = e.target;
      if (changingColumn && target.classList.contains("card")) {
        if (target !== currentDropzone) {
          document.getElementById("dropZone") &&
            document.getElementById("dropZone").remove();
          currentDropzone = target;

          var dropZoneElm = document.createElement("div");
          dropZoneElm.id = "dropZone";
          dropZoneElm.classList.add("dropzone");
          currentColumn.insertBefore(dropZoneElm, target);
        }
      }
    });

    column.addEventListener("drop", function(e) {
      if (changingColumn) {
        changingColumn = false;
        try {
          column.insertBefore(draggingCard, currentDropzone);
        } catch (err) {
          column.appendChild(draggingCard);
        }
      }
    });
  });

  cards.forEach(function(card) {
    card.draggable = true;

    card.addEventListener("dragstart", function(e) {
      draggingCard = e.target;
      draggingCard.style.opacity = 0.5;
    });

    card.addEventListener("dragend", function(e) {
      draggingCard.style.opacity = "";
      draggingCard = undefined;
      currentDropzone = undefined;
      document.getElementById("dropZone") &&
        document.getElementById("dropZone").remove();
    });
  });

  function handleCardDrag(card) {}
})();
