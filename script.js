// ===============================
// BINARY SEARCH TREE
// ===============================

class Node {
    constructor(id, name, marks) {
        this.id = id;
        this.name = name;
        this.marks = marks;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // INSERT
    insert(id, name, marks) {
        const newNode = new Node(id, name, marks);

        if (this.root === null) {
            this.root = newNode;
            return true;
        }

        let current = this.root;

        while (true) {
            if (id === current.id) return false;

            if (id < current.id) {
                if (current.left === null) {
                    current.left = newNode;
                    return true;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return true;
                }
                current = current.right;
            }
        }
    }

    // SEARCH
    search(id) {
        let current = this.root;

        while (current !== null) {
            if (id === current.id) return current;

            if (id < current.id)
                current = current.left;
            else
                current = current.right;
        }

        return null;
    }

    // INORDER TRAVERSAL
    inorder(node, result = []) {
        if (node !== null) {
            this.inorder(node.left, result);
            result.push(node);
            this.inorder(node.right, result);
        }

        return result;
    }

    // DELETE
    delete(id) {
        if (!this.search(id)) return false;

        this.root = this.deleteNode(this.root, id);
        return true;
    }

    deleteNode(node, id) {
        if (node === null) return null;

        if (id < node.id) {
            node.left = this.deleteNode(node.left, id);
        } else if (id > node.id) {
            node.right = this.deleteNode(node.right, id);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let successor = node.right;

            while (successor.left !== null) {
                successor = successor.left;
            }

            node.id = successor.id;
            node.name = successor.name;
            node.marks = successor.marks;

            node.right = this.deleteNode(
                node.right, successor.id
            );
        }

        return node;
    }
}


// Create BST
const bst = new BST();


// ===============================
// WEBSITE FUNCTIONS
// ===============================

// PAGE NAVIGATION

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";

    if (pageId === "view") displayStudents();
    if (pageId === "tree") displayTree();
    if (pageId === "dashboard") updateDashboard();
}


// ADD STUDENT

function addStudent() {
    const id = Number(document.getElementById("studentId").value);
    const name = document.getElementById("studentName").value.trim();
    const marks = Number(document.getElementById("studentMarks").value);

    if (!Number.isInteger(id) || id <= 0 ||
        name === "" || !Number.isFinite(marks) ||
        marks < 0 || marks > 100) {
        alert("Please enter valid student details!");
        return;
    }

    if (bst.insert(id, name, marks)) {
        alert("Student added successfully!");

        document.getElementById("studentId").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("studentMarks").value = "";

        updateDashboard();
    } else {
        alert("Student ID already exists!");
    }
}


// SEARCH STUDENT

function searchStudent() {
    const id = Number(document.getElementById("searchId").value);
    const student = bst.search(id);

    const result = document.getElementById("searchResult");

    if (student) {
        result.innerHTML = `
            <h3>Student Found!</h3>
            Student ID: ${student.id}<br>
            Name: ${student.name}<br>
            Marks: ${student.marks}
        `;
    } else {
        result.innerHTML = "Student not found!";
    }
}


// DELETE STUDENT

function deleteStudent() {
    const id = Number(document.getElementById("deleteId").value);

    if (!Number.isInteger(id) || id <= 0 || !bst.delete(id)) {
        alert("Student not found!");
        return;
    }

    alert("Student deleted successfully!");

    document.getElementById("deleteId").value = "";

    updateDashboard();
}


// DISPLAY ALL STUDENTS

function displayStudents() {
    const students = bst.inorder(bst.root);

    const list = document.getElementById("studentList");

    if (students.length === 0) {
        list.innerHTML = "No student records available.";
        return;
    }

    list.innerHTML = `
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Marks</th>
            </tr>

            ${students.map(student => `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.marks}</td>
                </tr>
            `).join("")}
        </table>
    `;
}


// DASHBOARD COUNTER

function updateDashboard() {
    const students = bst.inorder(bst.root);

    document.getElementById("totalStudents").innerText =
        students.length;
}


// BST VISUALIZATION

function displayTree() {
    const container = document.getElementById("treeView");

    if (bst.root === null) {
        container.innerHTML = "BST is empty.";
        return;
    }

    function createTree(node) {
        if (node === null) return "";

        return `
            <div class="tree-node">
                <div class="node-box">
                    ${node.id}<br>
                    ${node.name}
                </div>

                <div class="tree-children">
                    ${createTree(node.left)}
                    ${createTree(node.right)}
                </div>
            </div>
        `;
    }

    container.innerHTML = createTree(bst.root);
}