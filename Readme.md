# **File Command Handler**

## **Overview**  
A Node.js practice project that watches a `command.txt` file and performs file operations (create, delete, rename, add content) based on the commands written in it.

## **Commands Format**  
| Command                                          | Example                                          |
| ------------------------------------------------ | ------------------------------------------------ |
| `create a file <path>`                           | `create a file example.txt`                      |
| `delete the file <path>`                         | `delete the file example.txt`                    |
| `rename the file <old-path> to <new-path>`       | `rename the file old.txt to new.txt`             |
| `add to the file <path> this content: <content>` | `add to the file notes.txt this content: Hello!` |

## **How to Use**  
1. Create a `command.txt` file in the project directory.  
2. Add a command in the specified format.  
3. The application will detect changes and execute the command automatically.

### **Run the Project**  
Use the following command to start the application:  
```bash
node index.js