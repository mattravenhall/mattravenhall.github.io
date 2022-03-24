# README

## Run Locally
```bash
# Install Ruby
sudo apt-get install ruby-full build-essential zlib1g-dev

# Configure Ruby to not require sudo
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install jekyll & bundler
gem install jekyll bundler

# Install project gems
bundle install

# Serve locally
bundle exec jekyll serve
```
