import os
import re

def remove_lombok(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    if 'import lombok' not in content:
        return

    # Remove lombok imports
    content = re.sub(r'import lombok\.[a-zA-Z]+;\n?', '', content)

    # Check for specific annotations
    has_data = '@Data' in content
    has_no_args = '@NoArgsConstructor' in content
    has_all_args = '@AllArgsConstructor' in content

    # Remove lombok annotations
    content = re.sub(r'@Data\n?', '', content)
    content = re.sub(r'@NoArgsConstructor\n?', '', content)
    content = re.sub(r'@AllArgsConstructor\n?', '', content)
    content = re.sub(r'@Builder\n?', '', content)
    content = re.sub(r'@Getter\n?', '', content)
    content = re.sub(r'@Setter\n?', '', content)

    # Find the class name and fields
    class_match = re.search(r'public class (\w+)', content)
    if not class_match:
        return
    class_name = class_match.group(1)

    # Find all fields (simple naive regex for private fields)
    fields = re.findall(r'private ([\w<>\[\]]+) (\w+);', content)

    # Generate getters and setters
    methods = ""
    if has_data or '@Getter' in content or '@Setter' in content:
        for f_type, f_name in fields:
            cap_name = f_name[0].upper() + f_name[1:]
            
            # Getter
            methods += f"\n    public {f_type} get{cap_name}() {{\n"
            methods += f"        return {f_name};\n"
            methods += f"    }}\n"
            
            # Setter
            methods += f"\n    public void set{cap_name}({f_type} {f_name}) {{\n"
            methods += f"        this.{f_name} = {f_name};\n"
            methods += f"    }}\n"

    # Generate constructors
    constructors = ""
    if has_no_args:
        constructors += f"\n    public {class_name}() {{}}\n"

    if has_all_args or (has_data and not has_no_args and not has_all_args):
        # We only generate all args if explicitly requested, as @Data creates a required args constructor
        args = ", ".join([f"{f_type} {f_name}" for f_type, f_name in fields])
        assignments = "\n".join([f"        this.{f_name} = {f_name};" for _, f_name in fields])
        constructors += f"\n    public {class_name}({args}) {{\n{assignments}\n    }}\n"

    # Insert methods and constructors before the last closing brace
    last_brace_index = content.rfind('}')
    if last_brace_index != -1:
        content = content[:last_brace_index] + constructors + methods + content[last_brace_index:]

    with open(file_path, 'w') as f:
        f.write(content)

src_dir = r"C:\Users\chakr\OneDrive\Desktop\AI_Powered_Java_Backend\flood-dashboard-enterprise\backend\src\main\java\com\floodmap\dashboard"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.java'):
            remove_lombok(os.path.join(root, file))

print("Lombok removed!")
