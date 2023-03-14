#### HTML Structure

- section.wiki
  - div.container
    - img
    - h3(text)
    - form.form
      - input.form-input type='text'
      - button.submit-btn (search) type='submit'
  - div.results
    - div.articles
      - a
        - h4
        - p (lorem20)

#### API DOCS

- [wiki docs](https://www.mediawiki.org/wiki/API:Main_page)

- ready to go url's

#### Initial Setup

- select form, input, results
- listen for submit events
- if empty value, display error
- create fetchPages()
- pass valid input value into the fetchPages()

#### Fetch Pages

- display loading while fetching
- construct dynamic url
- display if error
- display error no items
- create renderResults()
- pass valid results into renderResults()

#### Render Results

- iterate over the list
- pull out title, snippet, pageid
- setup a card
- set results with div.articles and list inside

### screenshot

![Screenshot 2023-01-20 15![Screenshot 2023-01-20 152958](https://user-images.githubusercontent.com/105864220/213847760-705ec3c6-a5ac-4203-a648-c5cd147c41c2.png)
2537](https://user-images.githubusercontent.com/105864220/213847755-86d9aad1-cd87-400c-bbc3-289993f65a1a.png)
