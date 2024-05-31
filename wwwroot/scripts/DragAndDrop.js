function dragAndDrop(draggableClass, dropzoneClass, dotnetReference) {
    interact(draggableClass).draggable({
        listeners: {
            start(event) {
                const target = event.target;
                target.classList.add('dragging');
                target.classList.add('no-transition');
            },
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                const target = event.target;
                target.classList.remove('dragging');
                target.classList.remove('no-transition');
            }
        },
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        inertia: true
    });

    interact(dropzoneClass).dropzone({
        accept: draggableClass,
        ondrop(event) {
            const draggableElement = event.relatedTarget;
            const dropzoneElement = event.target;

            dotnetReference.invokeMethodAsync('HandleDrop', draggableElement.id, dropzoneElement.id)
                .then(correct => {
                    if (correct) {
                        dropzoneElement.classList.add('correct');
                        setTimeout(() => {
                            dropzoneElement.classList.remove('correct');
                            draggableElement.style.visibility = 'hidden';
                        }, 400);
                    } else {
                        dropzoneElement.classList.add('incorrect');
                        setTimeout(() => {
                            dropzoneElement.classList.remove('incorrect');
                            draggableElement.style.transform = 'translate(0, 0)';
                            draggableElement.setAttribute('data-x', 0);
                            draggableElement.setAttribute('data-y', 0);
                            draggableElement.style.backgroundColor = '#e74c3c';
                            setTimeout(() => {
                                draggableElement.style.backgroundColor = '';
                            }, 400);
                        }, 400);
                    }
                });
        },
        ondropactivate(event) {
            event.target.classList.add('drop-activated');
        },
        ondropdeactivate(event) {
            event.target.classList.remove('drop-activated');
        }
    });
}

function resetElementPosition(elementId, initialLeft, initialTop) {
    const element = document.getElementById(elementId);
    element.classList.add('no-transition');
    element.style.left = initialLeft;
    element.style.top = initialTop;
    element.style.transform = 'translate(0, 0)';
    element.setAttribute('data-x', 0);
    element.setAttribute('data-y', 0);
    element.style.visibility = 'visible';
    setTimeout(() => {
        element.classList.remove('no-transition');
    }, 10); 
}
