import { useEffect, useMemo, useRef, useState } from "react";

function Canvas() {
  const canvasReference = useRef(null);
  const contextReference = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [draggingRectangle, setDraggingRectangle] = useState(null); // New state for dragging rectangle

  const colors = useMemo(
    () => ["black", "red", "green", "orange", "blue", "yellow"],
    []
  );

  const sideRectangles = [
    { color: "blue", width: 50, height: 50 },
    { color: "green", width: 50, height: 50 },
    { color: "red", width: 50, height: 50 },
  ];
  // const sideRectangles = [
  //   { image: './bgs/garden.jpg', width: 50, height: 50 },
  //   { image: './bgs/house.jpg', width: 50, height: 50 },
  //   { image: './bgs/water.jpg', width: 50, height: 50 },
  // ];

  const clearCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    const isCanvasEmpty = !imageData.some((channel) => channel !== 0);

    if (isCanvasEmpty) {
      alert("Canvas is empty. There's nothing to save.");
      return;
    }
    const canvasData = canvas.toDataURL();

    const link = document.createElement("a");
    link.href = canvasData;
    link.download = "canvas_image.png"; // Set a default filename
    link.click();
  };

  const beginDraw = (e) => {
    const canvas = canvasReference.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    contextReference.current.beginPath();
    contextReference.current.moveTo(offsetX, offsetY);
    setIsPressed(true);
  };

  const updateDraw = (e) => {
    if (!isPressed) return;

    const canvas = canvasReference.current;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    contextReference.current.lineTo(offsetX, offsetY);
    contextReference.current.stroke();
  };

  const endDraw = () => {
    contextReference.current.closePath();
    setIsPressed(false);
  };

  const handleDragStart = (e, rectangle) => {
    setDraggingRectangle(rectangle); // Set the dragging rectangle
  };

  const handleDrop = (e) => {
    if (draggingRectangle) {
      const canvas = canvasReference.current;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - draggingRectangle.width / 2; // Adjust for rectangle width
      const offsetY = e.clientY - rect.top - draggingRectangle.height / 2; // Adjust for rectangle height

     

      const context = canvas.getContext("2d");
      context.fillStyle = draggingRectangle.color;
      context.fillRect(offsetX, offsetY, draggingRectangle.width, draggingRectangle.height);
      
      setDraggingRectangle(null); // Reset the dragging rectangle
    }
  };
  
  // const handleDrop = (e) => {
  //   if (draggingRectangle) {
  //     const canvas = canvasReference.current;
  //     const rect = canvas.getBoundingClientRect();
  //     const offsetX = e.clientX - rect.left - draggingRectangle.width / 2;
  //     const offsetY = e.clientY - rect.top - draggingRectangle.height / 2;
  
  //     const image = new Image();
  //     image.src = draggingRectangle.image;
  
  //     image.onload = () => {
  //       const context = canvas.getContext("2d");
  //       context.drawImage(image, offsetX, offsetY, draggingRectangle.width, draggingRectangle.height);
        
  //       setDraggingRectangle(null);
  //     };
  
  //     image.onerror = (error) => {
  //       console.error('Error loading image:', error);
  //     };
  //   }
  // };

  useEffect(() => {
    const canvas = canvasReference.current;
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 800;
    context.lineCap = "round";
    context.strokeStyle = colors[0];
    context.lineWidth = 5;
    contextReference.current = context;
  }, [colors]);

  const setColor = (color) => {
    contextReference.current.strokeStyle = color;
  };

  return (
    <>
    <div className="flex flex-col justify-center">

      <div className=" mt-4  m-auto flex gap-2">
        <canvas
          className="border border-black border-1"
          ref={canvasReference}
          onMouseDown={beginDraw}
          onMouseMove={updateDraw}
          onMouseUp={endDraw}
          onDrop={handleDrop} // New event handler for dropping rectangles onto canvas
          onDragOver={(e) => e.preventDefault()} // Prevent default behavior for dropping
          />
        <div className="side-rectangles">
          {sideRectangles.map((rectangle, index) => (
            <div
            key={index}
            className="side-rectangle"
            style={{
              backgroundColor: rectangle.color,
              width: rectangle.width,
              height: rectangle.height,
            }}
            draggable={true} // Enable dragging
            onDragStart={(e) => handleDragStart(e, rectangle)} // Handle drag start
            />
            ))}
        </div>
      </div>
      <div className="flex m-auto mt-4 gap-2 ">
        <button className="border border-black" onClick={clearCanvas}>
          Clear
        </button>
        <button className="border border-black" onClick={saveCanvas}>
          Save
        </button>

        {colors.map((color) => (
          <button
          key={color}
          onClick={() => setColor(color)}
          style={{ backgroundColor: color }}
          >
            {color === "black" ? "white" : color}
          </button>
        ))}
      </div>
        </div>
    </>
  );
}

export default Canvas;
