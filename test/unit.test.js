const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const newsController = require('../controller/NewsController');
const { fake } = require("faker");

describe("News top headline",()=>{
    const stubValue = {
        status: "OK",
        totalResults: 10,
        articles:[
            {
                source:{
                    id: faker.random.uuid(),
                    name: "BBC News"
                },
                author: faker.name.findName(),
                title: "NJ mass shooting: 2 dead, 12 injured after gunfire at home near Bridgeton - WPVI-TV",
                description: faker.lorem.sentence(),
                url: "https://6abc.com/nj-mass-shooting-new-jersey-bridgeton-party/10681750/",
                urlToImage: faker.image.imageUrl(),
                publishedAt: faker.date.past(),
                content: faker.lorem.sentences()
            }
        ]
    };
    it("it should trigger top headline", async()=>{
        
        const stub = sinon.stub(newsController, "topHeadline").returns(stubValue);
        const topHeadline = await newsController.topHeadline();
        expect(stub.calledOnce).to.be.true;
        expect(topHeadline.totalResults).to.equal(stubValue.totalResults);
        expect(topHeadline.articles).to.be.an('array')
        expect(topHeadline.articles[0]).to.have.own.property('source');
        expect(topHeadline.articles[0]).to.have.own.property('author');
        expect(topHeadline.articles[0]).to.have.own.property('title');
        expect(topHeadline.articles[0]).to.have.own.property('description');
        expect(topHeadline.articles[0]).to.have.own.property('url');
        expect(topHeadline.articles[0]).to.have.own.property('urlToImage');
        expect(topHeadline.articles[0]).to.have.own.property('publishedAt');
        expect(topHeadline.articles[0]).to.have.own.property('content');
    });

    it("It should work for everything api", async ()=>{
        const query = {
            q: "news",
            from: "2021-05-21",
            to: "2021-05-21",
            sortBy: "popularity"
        };
        const stub = sinon.stub(newsController, "everything").returns(stubValue);
        const topHeadline = await newsController.everything(query);
        expect(stub.calledOnce).to.be.true;
        expect(topHeadline.totalResults).to.equal(stubValue.totalResults);
        expect(topHeadline.articles).to.be.an('array')
        expect(topHeadline.articles[0]).to.have.own.property('source');
        expect(topHeadline.articles[0]).to.have.own.property('author');
        expect(topHeadline.articles[0]).to.have.own.property('title');
        expect(topHeadline.articles[0]).to.have.own.property('description');
        expect(topHeadline.articles[0]).to.have.own.property('url');
        expect(topHeadline.articles[0]).to.have.own.property('urlToImage');
        expect(topHeadline.articles[0]).to.have.own.property('publishedAt');
        expect(topHeadline.articles[0]).to.have.own.property('content');
    });
});