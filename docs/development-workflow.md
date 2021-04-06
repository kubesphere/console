## Development Workflow

### Step 1: Fork in the cloud

1. Visit https://github.com/kubesphere/console
2. Click `Fork` button to establish a cloud-based fork.

### Step 2: Clone fork to local storage

1. Create your `$working_dir`,and clone locally:

```shell
# Create your `$working_dir`
mkdir -p $working_dir
cd $working_dir
git clone https://github.com/$user/console.git
cd $working_dir/console
git remote add upstream https://github.com/kubesphere/console.git

# Never push to upstream master
git remote set-url --push upstream no_push

# Confirm that your remotes make sense:
git remote -v
```

### Step 3: Keep your branch in sync

```shell
git fetch upstream
git checkout master
git rebase upstream/master
```

### Step 4: Add new features or fix issues

Branch from it:

```shell
git checkout -b myfeature
```

Then edit code on the myfeature branch.

### Step 5: Development in new branch

**Sync with upstream**

After the test is completed, suggest you to keep your local in sync with upstream which can avoid conflicts.

```shell
# Rebase your the master branch of your local repo.
git checkout master
git rebase upstream/master

# Then make your development branch in sync with master branch
git checkout new_feature
git rebase -i master
```
**Commit local changes**

See [Git Commit Messages Style Guide](../CONTRIBUTING.md#git-commit-messages)

```shell
git commit -a -s
```

### Step 6: Push to your fork

When ready to review (or just to establish an offsite backup or your work), push your branch to your fork on `github.com` .

```shell
git push -f ${your_remote_name} myfeature
```

### Step 7: Create a PR

- Visit your fork at `https://github.com/$user/console`.
- Click the` Compare & Pull Request` button next to your myfeature branch.
- Check out the [pull request guide](./CONTRIBUTING.md#pull-requests) for more details and advice.
