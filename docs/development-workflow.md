## Development Workflow

### 1 Fork in the cloud

1. Visit https://github.com/kubesphere/console
2. Click `Fork` button to establish a cloud-based fork.

### 2 Clone fork to local storage

1. Create your clone locally:

```bash
$ mkdir -p $working_dir
$ cd $working_dir
$ git clone https://github.com/$user/console.git
$ cd $working_dir/console
$ git remote add upstream https://github.com/kubesphere/console.git

# Never push to upstream master
$ git remote set-url --push upstream no_push

# Confirm that your remotes make sense:
$ git remote -v
```

### 3 Keep your branch in sync

```bash
git fetch upstream
git checkout master
git rebase upstream/master
```

### 4 Add new features or fix issues

Branch from it:

```bash
$ git checkout -b myfeature
```

Then edit code on the myfeature branch.

### 5 Development in new branch

**Sync with upstream**

After the test is completed, suggest you to keep your local in sync with upstream which can avoid conflicts.

```bash
# Rebase your the master branch of your local repo.
$ git checkout master
$ git rebase upstream/master

# Then make your development branch in sync with master branch
git checkout new_feature
git rebase -i master
```
**Commit local changes**

See [Git Commit Messages Style Guide](../CONTRIBUTING.md#git-commit-messages)

```bash
$ git add <file>
$ git commit -a
```

### 6 Push to your folk

When ready to review (or just to establish an offsite backup or your work), push your branch to your fork on github.com:

```bash
$ git push -f ${your_remote_name} myfeature
```

### 7 Create a PR

- Visit your fork at https://github.com/$user/console
- Click the` Compare & Pull Request` button next to your myfeature branch.
- Check out the [pull request guide](./CONTRIBUTING.md#pull-requests) for more details and advice.
