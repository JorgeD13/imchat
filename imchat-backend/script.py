import os
import sys
from git import Repo
import time
import csv
import json

local_repo_directory = os.path.join(os.getcwd(), "Public_Keys")
destination = 'main'

def clone_repo():
    if os.path.exists(local_repo_directory):
        print("Directory exists, pulling changes from main branch")
        repo = Repo(local_repo_directory)
        origin = repo.remotes.origin
        origin.pull(destination)
    else:
        print("Directory does not exists, cloning")
        Repo.clone_from("git@github.com:JorgeD13/Public_Keys.git",
                        local_repo_directory, branch=destination)


def chdirectory(path):
    os.chdir(path)


def create_branch(repo, branch_name):
    print("Creating a new branch with id name " + branch_name)
    current = repo.create_head(branch_name)
    current.checkout()


def update_file(data):
    print("Modifying the file")
    chdirectory(local_repo_directory)
    with open('llaves.csv', 'a', newline='') as csvfile:
        spamwriter=csv.writer(csvfile, delimiter=',',
                            quotechar='|', quoting=csv.QUOTE_MINIMAL)
        print("DATA:", data)
        
        js = json.loads(data)
        print("JSON", js)
        print(js['USERNAME'])
        print(js['PUBLIC_KEY_X'])
        print(js['PUBLIC_KEY_Y'])
        spamwriter.writerow([js['USERNAME'], js['PUBLIC_KEY_X'], js["PUBLIC_KEY_Y"]])
    # opened_file = open("README.md", 'a')
    # opened_file.write("{0} added at {1} \n".format("I am a new string", str(time.time())))


def add_and_commit_changes(repo):
    print("Commiting changes")
    repo.git.add(update=True)
    print("END ADDING CHANGES")
    repo.git.commit("-m", "Adding a new line to the file.text file")
    print("END COMMITING CHANGES")


def push_changes(repo):
    print("Push changes")
    repo.git.push("--set-upstream", 'origin', destination)


def main():
    print("LLEGO AL SCRIPT")
    # clone the repository
    clone_repo()

    repo = Repo.init(local_repo_directory)

    # update file
    data = sys.stdin.readline()
    sys.stdout.flush()

    update_file(data)

    # add and commit changes
    add_and_commit_changes(repo)

    # push changes
    push_changes(repo)

    # setup github credentials and session
    # await setup_github(branch_name)


if __name__ == "__main__":
    main()
